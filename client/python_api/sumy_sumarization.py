# -*- coding: utf-8 -*-

from __future__ import absolute_import
from __future__ import division, print_function, unicode_literals

from sumy.parsers.html import HtmlParser
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer as Summarizer
from sumy.nlp.stemmers import Stemmer
from sumy.utils import get_stop_words

from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS
from sqlalchemy import create_engine
from json import dumps

app = Flask(__name__)
CORS(app)
api = Api(app)

@app.route('/summarizer', methods=['POST', 'OPTIONS'])
def summary():
        
        #print(request.args.get('summ_text'))
        #print(request.args.get('sentences'))

        f= open("paragraph.txt","w+")
        f.write(request.args.get('paragraph_text'))
        f.close()
        LANGUAGE = "english"
        SENTENCES_COUNT = request.args.get('sentences')

        parser = PlaintextParser.from_file("paragraph.txt", Tokenizer(LANGUAGE))
        stemmer = Stemmer(LANGUAGE)

        summarizer = Summarizer(stemmer)
        summarizer.stop_words = get_stop_words(LANGUAGE)

        summary = ""

        for sentence in summarizer(parser.document, SENTENCES_COUNT) :  
            #print(sentence)
            summary = summary + str(sentence)

        print(summary)
        data = {'status': summary}
        return jsonify(data)

if __name__ == '__main__':
        app.run()
        
