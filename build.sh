rm -rf ./docs/* ./docs/.*
cp ./src/robots.txt ./docs/
eleventy "$@"
