#!/usr/bin/env bash

SOURCE_DIR=`dirname "${BASH_SOURCE[0]}"` 

wget https://apidata.mos.ru/v1/datasets/916/features?api_key=3a6cb7b16a2e081b663ad089f4174fc6 -O "$SOURCE_DIR/"mos_data.json 
