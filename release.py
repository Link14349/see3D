# -*- coding: utf-8 -*-

import os
import sys
import re

version = "v0.0.1"
root = os.path.join(os.getcwd(), "dist/")
shields = ["dist", ".idea", ".git"]
# lines = 0
# sizes = 0       
same = root
mainContent = ""

files = ["index.js", "math.js", "item.js"]
for i in files:
        # print(i)
        if os.path.isfile(os.path.join(root, i)) and i.find(".map") == -1:
                file = open(os.path.join(root, i))
                mainContent += "\n\n// " + i + "\n\n" + file.read() + "\n";
                file.close()

# print(mainContent)
file = open(os.path.join(os.getcwd(), "release/See3D.js"), "w")
file.write(mainContent)
file.close()
file = open(os.path.join(os.getcwd(), "release/See3D-" + version + ".js"), "w")
file.write(mainContent)
file.close()

os.system("uglifyjs " + os.path.join(os.getcwd(), "release/See3D.js") + " -o " + os.path.join(os.getcwd(), "release/See3D.min.js"))
os.system("cp " + os.path.join(os.getcwd(), "release/See3D.min.js") + " " + os.path.join(os.getcwd(), "release/See3D-" + version + ".min.js"))
