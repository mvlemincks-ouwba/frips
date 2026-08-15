#!/usr/bin/env python3
import os, json, urllib.request, subprocess
env = open(os.path.expanduser('~/.hermes/.env')).read()
for line in env.splitlines():
    if line.startswith('GITHUB_TOKEN_CLASSIC='):
        TOK = line.split('=',1)[1].strip(); break

BR = 'feat/faq-livraison-copacker'
subprocess.run(['git','add','-A'], cwd='/Users/marcvlemincks/frips', check=True)
subprocess.run(['git','-c','user.name=mvlemincks-ouwba','-c','user.email=marc.vlemincks@ouwba.com',
                'commit','-q','-m','FRIPS: handle IG propre (@frips.frites) + kit lancement IG'],
               cwd='/Users/marcvlemincks/frips', check=True)
out = subprocess.run(['git','push','-u','origin',BR], cwd='/Users/marcvlemincks/frips', capture_output=True, text=True)
print('PUSH:', out.returncode, out.stderr[-200:])
payload = {'title':'[ig] Handle propre + kit lancement','head':BR,'base':'main',
           'body':'Remplace frips.fr (pas a nous) par @frips.frites + hello@frips-store.fr. Ajoute instagram/launch-kit.md.'}
req = urllib.request.Request('https://api.github.com/repos/mvlemincks-ouwba/frips/pulls',
  data=json.dumps(payload).encode(),
  headers={'Authorization':f'Bearer {TOK}','Content-Type':'application/json','Accept':'application/vnd.github+json'}, method='POST')
d = json.load(urllib.request.urlopen(req, timeout=15))
print('PR:', d.get('html_url') or d.get('message'))
