package test

import (
	"email-reminder/src/types"
	"encoding/json"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestReminderFrequencyJsonMarshal(t *testing.T) {
	res, err := json.Marshal(types.Annual)

	if assert.NoError(t, err) {
		assert.Equal(t, string(res), `"annual"`)
	}

	res2, err := json.Marshal(types.Semiannual)

	if assert.NoError(t, err) {
		assert.Equal(t, string(res2), `"semiannual"`)
	}
}

func TestReminderFrequencyJsonUnmarshal(t *testing.T) {
	var freq types.ReminderFrequency
	err := json.Unmarshal([]byte(`"annual"`), &freq)

	if assert.NoError(t, err) {
		assert.Equal(t, freq, types.Annual)
	}

	err = json.Unmarshal([]byte(`"semiannual"`), &freq)

	if assert.NoError(t, err) {
		assert.Equal(t, freq, types.Semiannual)
	}
}
