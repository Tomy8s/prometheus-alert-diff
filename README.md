# prometheus-alert-diff
Compare differences in alerts on different Prometheus servers

## Installation

Run the following command to install

```bash
$ npm install --global prometheus-alert-diff
```

The package requires a list of prometheus servers to check against. It will check the `PROMETHEUS_SERVERS` environment variable for a space-separated list. To add this on UNIX-like OSes:

If you wanted to add: `https://prometheus.example.com` and `https://prometheus-test.example.com`, you would run:

```bash
$ echo 'export PROMETHEUS_SERVERS="https://prometheus.example.com https://prometheus-test.example.com`' >> ~/.bash_profile
$ source ~/.bash_profile
```

## Running

If you would like to check and compare the alert `test_alert`, run the following command:

```bash
$ prometheus-alert-diff test_alert
```

The program will search for the alert on each of the servers included in `PROMETHEUS_SERVERS` and return a list of the alerts found. If no alerts are found on a given server it will display `No matching alerts found on <server>.`

## Todo

- accept servers from CLI argument
- run against multiple rules provided on CLI
- highlight differences between alerts
- tests
