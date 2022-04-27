from google_speech import Speech
import time

# say "Hello World"
notes = [ 
    'C',
    'D',
    'E',
    'F',
    'G',
    'A',
    'B',
]
lang = "en"

for n in notes:

    speech = Speech(n, lang)
    filename = '{}.mp3'.format(n)
    print('saving {}'.format(filename))
    speech.save(filename)
    time.sleep(5)