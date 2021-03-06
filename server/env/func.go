package env

import (
	"log"
	"os"
	"strconv"
)

func getEnv(key string) string {

	val, exists := os.LookupEnv(key)

	if !exists {
		log.Panicf("%s in .env not existed", key)
	}

	return val
}

func getEnvAsBool(key string) bool {

	valStr := getEnv(key)

	val, err := strconv.ParseBool(valStr)

	if err != nil {
		log.Panicf("%s=%s in .env is not boolean value", key, valStr)
	}

	return val
}

func getEnvAsInt(key string) int {

	valStr := getEnv(key)

	val, err := strconv.ParseInt(valStr, 10, 32)

	if err != nil {
		log.Panicf("%s=%s in .env is not int value", key, valStr)
	}

	return int(val)
}
