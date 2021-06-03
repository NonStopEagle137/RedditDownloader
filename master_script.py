# Support Script for reddit Scraping.
import pandas as pd
import json
import subprocess
import os
import sys
import time
def get_assets(number = 100):
    sub_reddits = ['r/meme'] # list of all good meme-subreddit accounts goes here.
    path = os.path.abspath(os.path.dirname(sys.argv[0]))
    for sub_reddit in sub_reddits:
        bat_code = r"""python redditdownloader {} --limit={}""".format(sub_reddit, str(number));       
        jump_directory = r"""cd {}""".format(path) 
        #bat_code = bat_code.encode('utf-8')
        print(' {} ; {}'.format(jump_directory,bat_code))
        os.system('{} ; {}'.format(jump_directory,bat_code))
        
get_assets(50)
