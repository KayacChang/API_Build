package order

import (
	"api/model"
	"api/model/pb"
	"api/model/response"
	"api/utils"
	"net/http"
)

// POST ...
func (it Handler) POST(w http.ResponseWriter, r *http.Request) {

	main := func() interface{} {

		// == Check Authorization #1 ==
		token := r.Header.Get("Authorization")
		if err := it.usecase.Auth(token); err != nil {

			return &model.Error{
				Code:    http.StatusUnauthorized,
				Name:    "Check Authorization #1",
				Message: err.Error(),
			}
		}

		// == Check Content-Type #2 ==
		if r.Header.Get("Content-Type") != "application/protobuf" {

			return response.ProtoBuf{
				Code: http.StatusBadRequest,

				Data: &pb.Error{
					Code:    http.StatusBadRequest,
					Name:    "Check Content-Type #2",
					Message: "Content-Type must be application/protobuf",
				},
			}
		}

		// == Parse ProtoBuf #3 ==
		order, err := it.Parse(r.Body)
		if err != nil {

			return response.ProtoBuf{
				Code: http.StatusBadRequest,

				Data: &pb.Error{
					Code:    http.StatusBadRequest,
					Name:    "Parse ProtoBuf #3",
					Message: err.Error(),
				},
			}
		}

		// == Check Exist #4 ==
		task1 := utils.Promisefy(func() (interface{}, error) {
			return it.usecase.FindGameByID(order.GameID)
		})
		task2 := utils.Promisefy(func() (interface{}, error) {
			return it.usecase.FindUserByID(order.UserID)
		})
		res, err := utils.WaitAll(task1, task2)
		if err != nil {

			code := http.StatusNotFound
			if err != model.ErrNotFound {
				code = http.StatusInternalServerError
			}

			return response.ProtoBuf{
				Code: code,

				Data: &pb.Error{
					Code:    uint32(code),
					Name:    "Check Exist #4",
					Message: err.Error(),
				},
			}
		}

		game := res[0].(*model.Game)
		user := res[1].(*model.User)

		// == Send Order #5 ==
		bet, err := it.usecase.SendOrder(user, game, order)
		if err != nil {
			_err := err.(*model.Error)

			return response.ProtoBuf{
				Code: _err.Code,

				Data: &pb.Error{
					Code:    uint32(_err.Code),
					Name:    "Send Order #5",
					Message: _err.Error(),
				},
			}
		}

		// == Store Order #6 ==
		order.ID = bet.OrderID
		order.State = model.Pending
		order.CreatedAt = bet.CreatedAt
		if err := it.usecase.StoreOrder(order); err != nil {

			return response.ProtoBuf{
				Code: http.StatusInternalServerError,

				Data: &pb.Error{
					Code:    http.StatusInternalServerError,
					Name:    "Store Order #6",
					Message: err.Error(),
				},
			}
		}

		// == Create Protobuf #7 ==
		data, err := order.ToProto()
		if err != nil {

			return response.ProtoBuf{
				Code: http.StatusInternalServerError,

				Data: &pb.Error{
					Code:    http.StatusInternalServerError,
					Name:    "Create Protobuf #7",
					Message: err.Error(),
				},
			}
		}

		return response.ProtoBuf{
			Code: http.StatusCreated,

			Data: data,
		}
	}

	it.Send(w, main())
}
