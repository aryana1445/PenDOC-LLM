# PenDOC-LLM

> **A lightweight CLI that sanitizes and normalizes text documents for LLM ingestion.**

[![CI](https://github.com/aryana1445/PenDOC-LLM/actions/workflows/ci.yml/badge.svg)](https://github.com/aryana1445/PenDOC-LLM/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## What is PenDOC-LLM?

PenDOC-LLM is a Node.js command-line tool that pre-processes `.txt` and `.md` files before they are fed into a large language model (LLM) pipeline.  Common document issues that degrade LLM performance are automatically fixed:

| Problem | Fix applied |
|---|---|
| Trailing whitespace on lines | Trimmed |
| 3+ consecutive blank lines | Collapsed to 2 |
| Windows CRLF endings | Converted to LF |
| Inconsistent ATX heading spacing | Normalized |
| Missing final newline | Added |

---

## Installation

```bash
# Clone the repo
git clone https://github.com/aryana1445/PenDOC-LLM.git
cd PenDOC-LLM

# Install dependencies
npm install
```

---

## Usage

```bash
node ./src/cli.js --input sample/input.md --output out.txt
```

Options:

| Flag | Alias | Description |
|---|---|---|
| `--input` | `-i` | Path to input `.txt` or `.md` file |
| `--output` | `-o` | Path for the sanitized output file |
| `--verbose` | `-v` | Print diagnostic info (masked API key, provider, paths) |
| `--help` | `-h` | Show help |

### Example

```bash
node ./src/cli.js --input sample/input.md --output out/cleaned.md --verbose
```

---

## Development

```bash
# Run the linter
npm run lint

# Run tests with coverage
npm test

# Auto-format source files
npm run format
```

---

## Configuration

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

`.env.example` contains:

```dotenv
PAID_SERVICE_API_KEY=changeme
MODEL_PROVIDER=mock
LOG_LEVEL=info
```

The `MODEL_PROVIDER` value of `mock` keeps the tool fully offline; no real API calls are made.

---

## Security

> ⚠️ **All credentials in this repository are dummy values intended solely for testing and CTF demonstration purposes.**
>
> The `PAID_SERVICE_API_KEY` committed in `.env` is a placeholder flag string — it is **not** a real API key for any paid service, and it will not authorize any real requests.  Never commit real secrets to source control.

---

## Project Structure

```
pendoc-llm/
├── .env                  ← committed dummy credentials (CTF demo)
├── .env.example          ← template for real deployments
├── src/
│   ├── cli.js            ← CLI entry point (yargs)
│   ├── config.js         ← env-var loading via dotenv
│   └── sanitize.js       ← core sanitization logic
├── test/
│   └── sanitize.test.js  ← Jest unit tests
├── sample/
│   └── input.md          ← example messy markdown
└── package.json
```

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Code of Conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## License

[MIT](LICENSE) © PenDOC-LLM Contributors
