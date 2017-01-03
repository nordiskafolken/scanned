export PATH=/usr/local/bin:$PATH
BOOK="1"
FILES=("$@")
CHAPTER=$(echo "$1" | sed "s/.*\///" | sed "s/.*\///" | sed "s/\-.*//")
DIR=$(dirname "${1}")
OUTPUT="$DIR/B${BOOK}K${CHAPTER}.jpg"
osascript -e "display notification \"$OUTPUT\""
echo $FILENAME
for f in "$@"
do
 convert -append "$@" "$OUTPUT"
echo "$f"
done
open "$OUTPUT"
