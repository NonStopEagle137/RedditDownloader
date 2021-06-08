# Support Script for reddit Scraping.
import pandas as pd
import json
import subprocess
import os
import sys
import time
def get_assets(number = 100):
    sub_reddits = input("Please Input a comma seperated Subreddit list : ");
    sub_reddits = list(sub_reddits.split(','))
    #sub_reddits = ['r/meme'] # list of all good meme-subreddit accounts goes here.
    path = os.path.abspath(os.path.dirname(sys.argv[0]))
    filters = input("Enter any one filter : Options are (top,hot,new,controversial,gilded,rising)")
    filters = str(filters)
    for sub_reddit in sub_reddits:
        bat_code = r"""python redditdownloader {} --type {} --limit={}""".format(sub_reddit, filters, str(number));       
        jump_directory = r"""cd {}""".format(path) 
        #bat_code = bat_code.encode('utf-8')
        print(' {} ; {}'.format(jump_directory,bat_code))
        os.system('{} ; {}'.format(jump_directory,bat_code))

number_of_memes_per_subreddit = input("Enter the Number of Memes to download per subreddit : ");
get_assets(eval(number_of_memes_per_subreddit))
