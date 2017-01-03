# Scanned files

This repo contains scanned chapters, where each chapter is an JPEG file - ready to be OCR'd!

## Rename

Make each current JPEG devided into chapters with the naming 10-1. Where 10 is chapter number and -1 indicated the part of the chapter.

ie jpeg files 10-1, 10-2 and 10-3 together make up Chapter 10.

Duplicate and crop files accordingly when 2 chapters share a page. (Can be done in preview app on mac)

## Automator script

Make a new automator service script like this;

![](https://ipfs.io/ipfs/QmfHePSUxeNe2eRPSApDtctG13cPDgaiyZWFAKNHW1JdJg)

Select renamed files, for example [19-1, 19-2, 19-4], and run the service script.

Note: the BOOK var in the script much be changed for each new book.

You can also just pass all the files to the automator-shell-script.sh if you run it in your terminal.
