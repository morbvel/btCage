#!/bin/bash
git clone https://miguelsbd:StrategyBigData1234@github.com/morbvel/btCage.git /Users/miguel/Desktop/test

execution=``
unamestr=`uname`
if [[ "$unamestr" == 'Darwin' ]]; then
   /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --system-developer-mode --load-extension=/Users/miguel/Desktop/test
elif [[ "$unamestr" == 'Linux' ]]; then
   execution=`google-chrome`
else
  execution=`start chrome`
fi
