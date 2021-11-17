#!/usr/bin/env python3
# coding: utf-8

import re
import json
from bs4 import BeautifulSoup


def main():
    content = ''
    with open('./colors.html', 'r') as f:
        content = f.read()
    
    soup = BeautifulSoup(content, 'lxml')

    colors = []
    colorcols = soup.find_all('div', {'class': 'colorcol'})
    for col in colorcols:
        name = col.find('p', {'class': 'swatchname'}).get_text().strip()
        hexval = col.find('p', {'class': 'hexval'}).get_text().strip()

        colors.append({
            'name': name,
            'hexval': hexval,
        })
    
    with open('./colors.json', 'w') as f:
        f.write(json.dumps(colors))
    
    print('[ INFO ] parse end !')


if __name__ == '__main__':
    main()
