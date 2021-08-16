import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useHistory } from "react-router-dom";
import { getConversationsByUser, getConversation } from '../../services/conversations'
import Channel from './Channel';
import MessagesPanel from './MessagesPanel';
import Loader1 from '../loader/Loader1'
import Title from '../Title'
import Illustration from '../../images/User/Humaaans-PhoneGreen.png'


export default function Chat() {

    // Get params 
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();

    const history = useHistory();

    const [oneConversation, setOneConversation] = useState([])
    const [conversations, setConversations] = useState([])
    const [loadedConversations, setLoadedConversations] = useState(false)

    const [conversationId, setConversationId] = useState(query.get("conversation") ? query.get("conversation") : "")

    //get all conversation
    useEffect(() => {
        getConversationsByUser(setConversations, setLoadedConversations)
    }, [])

    useEffect(() => {
        setConversationId(query.get("conversation") ? query.get("conversation") : "")
    }, [query])

    useEffect(() => {
        if (conversationId !== "") {
            getConversation(setOneConversation, conversationId)
        }
    }, [conversationId])

 

    return (
        <div className="oneAssociation">

            <Title title="Mes Tchats" />


            {/* Presentation associations */}
            <div className="row justify-content-center description-page">
                <div className="col-10 col-sm-8 col-md-5 col-lg-5 col-xl-4 text-description">
                    <p>
                        Voici toute les conversations auxquelles tu es inscris<br></br>
                        Ici, tu peux échanger avec toute les personnes qui participent aux même évènements que toi.
                        <br></br>
                        <br></br>
                        Les chat sont listés ci-dessous, pour en rejoindre un rien de plus simple, il suffit de cliquer sur celui de ton choix!
                        <br></br><br></br>
                        Pour t'inscrire à de nouveaux évènements et ainsi participer au chat qui lui est dédié, <i onClick={() => history.push("/evenements")}>c'est ici</i> !
                    </p>
                </div>
                <div className="col-8 col-sm-5 col-md-4 col-lg-3 offset-xl-1 col-xl-2">
                    <img className="rocket-illustration" src={Illustration} alt="Men searching with binoculars" />
                </div>
            </div>



            <div className="row justify-content-center">
                <div className="choiceChat">
                    <h4>Liste des Tchats</h4>
                </div>
            </div>

            {/* Channel List  */}
            {(() => {
                if (conversations.length === 0 && loadedConversations === true) {
                    return <div className="row justify-content-center">
                        <p className="col-10 col-md-8 col-xl-6 geolocalisation-none">Désolé, Vous n'avez aucune conversation en cours</p>
                    </div>
                } else if (conversations.length > 0 && loadedConversations === true) {

                    return <div className="row justify-content-center">
                        <div className="allChannels col-10 col-sm-8 col-lg-6">
                            {conversations
                                .map((conversation, key) => {
                                    return <Channel key={key} conversation={conversation} />
                                })}
                        </div>
                    </div>
                } else {
                    return <div className="row justify-content-center">
                        <Loader1 />
                    </div>
                }
            })()}



          


            {/* Messages List  */}
            {oneConversation && query && oneConversation.id > 0 &&
                <MessagesPanel conversation={oneConversation} />
            }
        </div>
    )
}
