import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Games from "./components/Games";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      games: [
        {
          id: 1,
          title: 'Герои 3',
          url: '',
          price: '399',
          discount: false,
          now_price: '343',
          I_have_this_game: false
        },
        {
          id: 2,
          title: 'CS GO',
          url: '',
          price: '899',
          discount: true,
          now_price: '343',
          I_have_this_game: false
        },
        {
          id: 3,
          title: 'Апекс',
          url: '',
          price: '200',
          discount: false,
          now_price: '343',
          I_have_this_game: false
        },
        {
          id: 4,
          title: 'Ведьмак',
          url: '',
          price: '599',
          discount: true,
          now_price: '343',
          I_have_this_game: false
        },
        {
          id: 5,
          title: 'NFS',
          url: '',
          price: '1399',
          discount: false,
          now_price: '343',
          I_have_this_game: false
        },
        {
          id: 6,
          title: 'Assasins',
          url: '',
          price: '699',
          discount: false,
          now_price: '343',
          I_have_this_game: false
        },
        {
          id: 7,
          title: 'DOOM',
          url: '',
          price: '1499',
          discount: true,
          now_price: '343',
          I_have_this_game: false
        },
        {
          id: 8,
          title: 'PUBG',
          url: '',
          price: '369',
          discount: false,
          now_price: '343',
          I_have_this_game: false
        },
        {
          id: 9,
          title: 'Крестики нолики',
          url: '',
          price: '699',
          discount: false,
          now_price: '343',
          I_have_this_game: true
        },
        {
          id: 10,
          title: 'Шашки',
          url: '',
          price: '699',
          discount: false,
          now_price: '343',
          I_have_this_game: true
        },
        {
          id: 11,
          title: 'Морской бой',
          url: '',
          price: '699',
          discount: false,
          now_price: '343',
          I_have_this_game: true
        },
      ]
    };
  }
  render(){
    return(
      <div className='wrapper'>
        <Header />
        <Games games={this.state.games}/>
        <Footer />
      </div>
    )
  }
}

export default App;
