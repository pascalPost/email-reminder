package types

//go:generate enumer -type=ReminderFrequency -json -transform=snake -output=reminderFreq_enumer.go
type ReminderFrequency uint8

const (
	Semiannual ReminderFrequency = iota
	Annual
)

func NewReminderFrequency(s string) (ReminderFrequency, error) {
	return ReminderFrequencyString(s)
}

func (r ReminderFrequency) StringGerman() string {
	if r == Semiannual {
		return "halbjährlich"
	} else if r == Annual {
		return "jährlich"
	}

	return "invalid reminder frequency"
}
