import React, { Component } from "react";
import Container from "../../components/Container";
import Jumbotron from "../../components/Jumbotron";
import Panel from "../../components/Panel";
import SearchForm from "../../components/SearchForm";
import List from "../../components/List";
import ListItem from "../../components/ListItem";
import ListDiv from "../../components/ListDiv";
import ButtonGroup from "../../components/ButtonGroup";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import API from "../../utils/API";
import MessageDiv from "../../components/MessageDiv";

class Home extends Component {

    //state resides in parent component, and will be passed down to children components as needed
    state = {
        topic: " ", //default values used if nothing is entered
        startYear: 2018,
        endYear: 2019,
        results: [],
        error: "",
        savedArticles: []
    };

    //When page loads, makes a request to get any articles saved in database.
    componentDidMount() {
        this.getSaved();
    };

    getSaved = () => {
        console.log("getSaved method")
        API.getSavedArticles().then(response => {
            console.log("response to getSavedArticles: ", response);
            this.setState({
                savedArticles: response.data
            });
        })
    };

    //Called when user updates any of 3 form inputs
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    };


    //Called when user clicks submit button in form
    handleFormSubmit = event => {
        event.preventDefault();
        document.querySelector("form").reset();
         //Call method on API that will pass in state as parameter to be used to interact with NYT API

        API.getArticles(this.state).then(res => {
            if (res.data.status === "error") {
                throw new Error(res.data.message);
            };
            this.resultsTop.scrollIntoView({ behavior: "smooth", block: "start"}); //Scolls down to the resultsTop reference inthe results panel

            this.setState({ results: res.data.response.docs.slice(0,5), error: "" }); //Saves first 5 search results into state as an array of objects
        }).catch(err => this.setState({ error: err.message }))
    };

    //Opens article in new window
    viewArticle = event => {
        console.log(event.target.value);
        window.open(      
            event.target.value,
            '_blank' //
          );
    };

    //Called when user clicks Save button
    handleArticleSave = event => {
        event.preventDefault();
        const clickedArticle = (this.state.results.filter(element => element._id === event.target.id)[0]);//Locates the article from the results array with the ID matching the button clicked

        API.saveArticle(clickedArticle).then(res => {
            this.getSaved(); 
            this.savedTop.scrollIntoView({ behavior: "smooth", block: "center"}); //Scolls down to the savedTop reference in the Saved panel

        })
    };

    //Called when user clicks Delete button
    handleArticleDelete = (event) => {
        event.preventDefault();
        const clickedArticle = this.state.savedArticles.filter(element => element._id = event.target.id)[0]; //Locates the article from the savedArticle array with the ID matching the button clicked
        API.deleteArticle(clickedArticle).then(response => {
            this.getSaved(); 
        })
    };

    render() {
        return (
            <div>
                <Container>
                    <Jumbotron>
                        <h1 className="jumbotron-header">New York Times Article Scrubber</h1>
                        <h3>Search for NYT articles using a keyword and save any articles to review later</h3>
                    </Jumbotron>
                    <Panel heading="Search">
                        < SearchForm
                            handleInputChange={this.handleInputChange}
                            handleFormSubmit={this.handleFormSubmit}
                        />
                    </Panel>

                    <Panel heading="Results">
                    <div style={{ float:"left", clear: "both" }}
                        ref={(el) => { this.resultsTop = el; }}>
                    </div>
                                   {this.state.results.length ? (
                            <List>
                                {this.state.results.map(result => ( //For each article in the result array, create a list item with a div w/ article info, and a save button with article ID
                                    <ListItem key={result._id}>
                                        <ListDiv headline={result.headline.main} byline={result.byline.original} pub_date={result.pub_date} snippet={result.snippet} url={result.web_url} />
                                        <ButtonGroup>
                                        <Button className="btn viewArticle" value ={result.web_url} onClick={this.viewArticle}>
                                            View Article
                                            </ Button>
                                            <Button id={result._id} className="btn saveBtn" onClick={this.handleArticleSave}>
                                                Save Article
                                            </ Button>

                                        </ ButtonGroup>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (<MessageDiv message="Search for an Article Above and View Results Here" />)}
                        
                    </Panel>
                    <Panel heading="Saved Articles">
                    <div style={{ float:"left", clear: "both" }}
                        ref={(el) => { this.savedTop = el; }}>
                    </div>
                        {this.state.savedArticles.length ? (
                            <List>
                                {this.state.savedArticles.slice(0).reverse().map(article => ( //For each article in the savedArticles array, create a list item (reverse order) with a div w/ article info, and a delete button with article ID
                                    <ListItem key={article._id}>
                                       <ListDiv headline={article.headline} byline={article.byline} pub_date={article.pub_date} snippet={article.snippet} url={article.url} />
                                        <ButtonGroup>
                                        <Button className="btn viewArticle" value ={article.web_url} onClick={this.viewArticle}>
                                            View Article
                                            </ Button>
                                        <Button id={article._id} className="btn deleteBtn" onClick={this.handleArticleDelete}>
                                                Delete Article
                                        </ Button>
                                        </ ButtonGroup>

                                    </ListItem>
                                ))}
                            </List>
                        ) : <MessageDiv message="Save an article from the search results above and view the list of saved articles here." />}
                    </Panel>
                    <Footer> Patrick Francis 2018</Footer>
                </Container>
                
            </div>
        )
    }
}

export default Home;