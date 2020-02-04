#yolo (pas utilisé)
LD_PRELOAD=/usr/lib/arm-linux-gnueabihf/libatomic.so.1.2.0 python3 yolo.py --folder ~/Pictures/  --yolo $PWD --confidence 0.5 --threshold 0.003

#pedes detection
LD_PRELOAD=/usr/lib/arm-linux-gnueabihf/libatomic.so.1.2.0 python3 ~/pedes-detection/script/detect.py --images ~/pedes-detection/images/

#take photo
raspistill -w 540 -h 480 -q 80 -o ~/Pictures/Last\ Image.jpg