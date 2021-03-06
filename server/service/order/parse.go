package order

import (
	"api/model"
	"api/model/pb"
	"io"
	"io/ioutil"

	"github.com/golang/protobuf/proto"
)

// Parse ...
func (it Handler) Parse(reqBody io.Reader) (*model.Order, error) {

	reqByte, err := ioutil.ReadAll(reqBody)
	if err != nil {
		return nil, err
	}

	req := pb.Order{}
	if err := proto.Unmarshal(reqByte, &req); err != nil {
		return nil, err
	}

	order := model.Order{}
	if err := order.FromProto(req); err != nil {
		return nil, err
	}

	return &order, nil
}
