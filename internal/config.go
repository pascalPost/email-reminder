package internal

type Config struct {
	Dev bool
}

func NewConfig() *Config {
	const dev = true

	return &Config{
		Dev: dev,
	}
}
