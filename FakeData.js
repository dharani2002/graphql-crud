

 let games = [
    {id: '1', title: 'Zelda, Tears of the Kingdom', platform: ['Switch'],deleted: false, deletedAt: null},
    {id: '2', title: 'Final Fantasy 7 Remake', platform: ['PS5', 'Xbox'],deleted: false, deletedAt: null},
    {id: '3', title: 'Elden Ring', platform: ['PS5', 'Xbox', 'PC'],deleted: false, deletedAt: null},
    {id: '4', title: 'Mario Kart', platform: ['Switch'],deleted: false, deletedAt: null},
    {id: '5', title: 'Pokemon Scarlet', platform: ['PS5', 'Xbox', 'PC'],deleted: false, deletedAt: null},
]
  
  let authors = [
{id: '1', name: 'mario', verified: true,token:null,isLoggedIn:false},
{id: '2', name: 'yoshi', verified: false,token:null,isLoggedIn:false},
{id: '3', name: 'peach', verified: true,token:null,isLoggedIn:false},
]

 let reviews = [
{id: '1', rating: 9, content: 'lorem ipsum', author_id: '1', game_id: '2'},
{id: '2', rating: 10, content: 'lorem ipsum', author_id: '2', game_id: '1'},
{id: '3', rating: 7, content: 'lorem ipsum', author_id: '3', game_id: '3'},
{id: '4', rating: 5, content: 'lorem ipsum', author_id: '2', game_id: '4'},
{id: '5', rating: 8, content: 'lorem ipsum', author_id: '2', game_id: '5'},
{id: '6', rating: 7, content: 'lorem ipsum', author_id: '1', game_id: '2'},
{id: '7', rating: 10, content: 'lorem ipsum', author_id: '3', game_id: '1'},
]

let gameStats=[]
  
 export default { games,reviews,authors}
 