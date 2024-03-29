import React, {Component} from "react";
import CardList from '../components/CardList';
import Searchbox from '../components/Searchbox';
import Scroll from '../components/Scroll';
import Errorboundry from '../components/Errorboundry';
import './App.css';
class App extends Component {
    constructor(){
        super();
        this.state = {
            robots: [],
            searchfield: '', 
        }
    }

    componentDidMount(){
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(user => this.setState({robots: user}));
    }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value});
    }
    render(){

        const {robots, searchfield} = this.state;
        const filteredRobots = robots.filter(robots => {
            return robots.name.toLowerCase().includes(searchfield.toLowerCase());
        })

        return (!robots.length) ? <h1 className="tc">Loading</h1> :          
        (
            <div className="tc">
                <h2 className="thomas-style">Welcome to <b>Thomas</b></h2>
                <h1>Robofriends</h1>
                <Searchbox searchChange={this.onSearchChange}/>
                <Scroll>
                    <Errorboundry>
                        <CardList robots={filteredRobots} />
                    </Errorboundry>
                </Scroll>
            </div>
        )
    }
}

export default App;
