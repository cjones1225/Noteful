import React, {Component} from 'react';
import FolderList from '../FolderList/FolderList'
import Note from '../Note/Note';
import NoteContext from '../NoteContext';

class Main extends Component {
    static contextType = NoteContext

    render(){
        return(
            <main className="main-page">
                <div className="container">
                    <section className='sidebar-main'>
                        <FolderList/>
                    </section>
                    <main className='Note-Main'>
                        <Note/>
                    </main>
                </div>
            </main>
        );
    }
}

export default Main;