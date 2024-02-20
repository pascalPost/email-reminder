package types

import "fmt"

type ReminderFrequency uint8

const (
	SEMIANNUAL ReminderFrequency = iota
	ANNUAL
)

func NewReminderFrequency(s string) (ReminderFrequency, error) {
	if s == "SEMIANNUAL" {
		return SEMIANNUAL, nil
	} else if s == "ANNUAL" {
		return ANNUAL, nil
	}

	return 0, fmt.Errorf("invalid reminder frequency: %s", s)
}

func (r ReminderFrequency) String() string {
	if r == SEMIANNUAL {
		return "SEMIANNUAL"
	} else if r == ANNUAL {
		return "ANNUAL"
	}

	return "invalid reminder frequency"
}

func (r ReminderFrequency) StringGerman() string {
	if r == SEMIANNUAL {
		return "halbjährlich"
	} else if r == ANNUAL {
		return "jährlich"
	}

	return "invalid reminder frequency"
}
