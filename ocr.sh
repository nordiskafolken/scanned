export PATH=/usr/local/bin:$PATH
NAME=$(echo "$1" | sed "s/.*\///" | sed "s/.*\///" | sed "s/\-.*//")
tesseract -l swe $1 "$NAME.dirty.txt"
