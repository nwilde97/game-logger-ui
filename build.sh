yarn build && \
aws s3 sync ./build s3://league-game-logger/prod --delete --profile league
