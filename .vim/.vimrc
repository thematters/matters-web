set nocompatible
filetype off

call plug#begin('~/.local/share/nvim/plugged')

" Plugins
Plug 'scrooloose/nerdtree'
Plug 'jistr/vim-nerdtree-tabs'
Plug 'elzr/vim-json'
Plug 'mattn/emmet-vim'
Plug 'dense-analysis/ale'
Plug 'yardnsm/vim-import-cost', { 'do': 'npm install' }
Plug 'mileszs/ack.vim'

Plug 'docker/docker' , {'rtp': '/contrib/syntax/vim/'}
Plug 'leafgarland/typescript-vim'
Plug 'peitalin/vim-jsx-typescript'
Plug 'jparise/vim-graphql'
Plug 'sbdchd/neoformat'
Plug 'tpope/vim-cucumber'

call plug#end()

" General settings
set number
set encoding=utf-8
set fileencoding=utf-8
set mouse-=a
set clipboard+=unnamed
syntax on

" NERDTree
let NERDTreeAutoDeleteBuffer = 1
let NERDTreeMinimalUI = 1
let NERDTreeShowHidden = 1
let NERDTreeShowLineNumbers = 1
let NERDTreeWinSize = 50

" NERDTree-tabs
let g:nerdtree_tabs_open_on_console_startup = 1

" Ale
let g:airline#extensions#ale#enabled = 1

" import cost
augroup import_cost_auto_run
  autocmd!
  autocmd InsertLeave *.js,*.jsx,*.ts,*.tsx ImportCost
  autocmd BufEnter *.js,*.jsx,*.ts,*.tsx ImportCost
  autocmd CursorHold *.js,*.jsx,*.ts,*.tsx ImportCost
augroup END
