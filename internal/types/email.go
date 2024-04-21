package types

import "time"

type Email struct {
	Id       uint
	ClientId uint
	Time     time.Time
}
