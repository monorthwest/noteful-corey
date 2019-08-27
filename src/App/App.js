import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
//import dummyStore from '../dummy-store';
import {getNotesForFolder, findNote} from '../notes-helpers';
import UserContext from '../UserContext'
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };
    

    componentDidMount() {
        fetch(`http://localhost:9090/notes`)
        .then(res => {
            if(!res.ok){
                throw new Error('Something went wrong')
            }
        return res.json()
        })          
        .then(data => {
            console.log(data)
            this.setState({notes: data})
        })
        .catch(error => {
            console.error(error)
        })

            fetch(`http://localhost:9090/folders`)
            .then(res => {
                if(!res.ok){
                    throw new Error('Something went wrong')
                }
            return res.json()
            })          
            .then(data => {
                console.log(data)
                this.setState({folders: data})
            })
            .catch(error => {
                console.error(error)
            })
        
           
        // fake date loading from API call
        //setTimeout(() => this.setState(dummyStore), 600);
    }
    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    };
    
    renderNavRoutes() {
      
        // const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route path="/note/:noteId"component={NotePageNav}/>
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        const {notes} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => {
                            const {folderId} = routeProps.match.params;
                            const notesForFolder = getNotesForFolder(
                                notes,
                                folderId
                            );
                            
                            return (
                                <NoteListMain
                                    {...routeProps}
                                    notes={notesForFolder}
                                />
                            );
                        }}
                        // component={NoteListMain}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId);
                        return <NotePageMain {...routeProps} note={note} />;
                     }}
                    //component={NotePageMain}
                />
            </>
        );
    }

    render() {
        const contextValue ={
            folders: this.state.folders,
            notes: this.state.notes,
           
        }
        return (
            
            <UserContext.Provider value={contextValue}>
                <div className="App">
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </div>
            </UserContext.Provider>

        );
    }

}
export default App;
