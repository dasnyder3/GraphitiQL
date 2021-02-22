import Head from 'next/head';

import { useState, useEffect } from 'react';

import Header from '../components/icons/Header.js';

import DiagramSideBar from '../components/diagrams/DiagramSidebar.js';
import DiagramNavbar from '../components/diagrams/DiagramNavbar.js';
import DiagramModal from '../components/diagrams/DiagramModal.js';
import { useQuery, gql } from '@apollo/client';
// import { GET_ALL_DIAGRAMS } from '../lib/queries';

const GET_ALL_DIAGRAMS = gql`query {
  diagrams {
    user {
      oAuthId
      oAuthData {
        username
        photos {
          value
        }
      }
    }
    diagramName
    reactFlowData {
      position
      zoom
      tables {
        id
        type
        data {
          label {
            type
            key
            ref
            props {
              children {
                type
                key
                ref
                props {
                  id
                  nodeid
                  tablename
                  columns {
                    name
                    dataType
                    required
                    primaryKey
                  }
                }
                _owner
                _store
              }
            }
            _owner
            _store
          }
        }
        position {
          x
          y
        }
        targetPosition
        sourcePosition
      }
      connections {
        id
        source
        sourceHandle
        target
        targetHandle
        animated
        style {
          stroke
          strokeWidth
        }
        type
      }
    }
  }
}`

const Diagrams = (props) => {

  const [newDiagram, setNewDiagram] = useState(false)
  const [pageLoading, setPageLoading] = useState(false);

  const { loading, error, data } = useQuery(GET_ALL_DIAGRAMS);

  useEffect(() => {
    console.log(loading);
    console.log(error);
    console.log(data);
  }, [data, loading, error]);

  const sidebar = <DiagramSideBar />

  const diagrammodal = newDiagram ? <DiagramModal message={props.message} setPageLoading={setPageLoading} /> : '';

  return (
      <div id='diagram'>

        <Head>
          <title>giraffeQL</title>
          <link rel="shortcut icon" href="/favicon.png" />
        </Head>

        <Header />
        
        <DiagramNavbar />

        <div id='browsediagrams'>
          {sidebar}
          <button id='newdiagrambtn' onClick={() => setNewDiagram(!newDiagram)}>New Diagram</button>
        </div>

        {diagrammodal}

        { pageLoading ? (<div id='loading'>Searching for your database...</div>) : <div/>}

        <style jsx>{`

          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;300;500;700;900&display=swap');

          *{
            font-family: 'Inter', sans-serif;
            transition: all .3s ease;
            font-weight: 300;
          }

          #diagram{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            width: 100vw;
            height: 100vh;
            background-color: #edf2f7;
          }

          #browsediagrams{
            display: flex;
            flex-direction: column;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06), 0px 0px 16px 0px rgba(0,0,0,.1);
            border-radius: 8px;
            width: 55%;
            height: 575px; 
            background-color: white;
            z-index: 10;
          }

          #header{
            width:  100%;
            height: 48px;
            margin-top: -32px;
            text-align: center;
            font-size: 24px;
            line-height: 2em;
            background-color: #5661b3;
            color: #b2b7ff;
            border-radius: 8px 8px 0px 0px;
          }

          #diagramcontainer{
            display: flex;
            align-items: center;
            margin-top: 16px;
            justify-content: center;
            flex-direction: column;

            #newdiagrambtn{

              &:hover{
                
              }

          }
            svg{
              margin: 0;
              top: 0;
              width: 150px;
              height: 150px;
            }

            h1{
              font-size: 24px;  
              font-weight: 700;
              color: #2d3748;
              text-align: center;
              margin: 0;
            }

            h2{
              font-size: 16px;
              font-weight: 500;
              color: #434190;
              text-align: center;
              margin: 0;
              margin-bottom: 16px;
            }

            h3{
              font-size: 12px;
              font-weight: 700;
              color: #2d3748;
              text-align: center;
              margin: 4px;
              // margin-top: 16px;
            }
            
            #postgres{
              margin-top: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              border-radius: 4px 0px 0px 4px;
              padding: 8px;
              outline: none;
              font-size: 12px;
              border: 1px solid #6f8195;
              border-right: none;
              color: #6f8195;
              background-color: #d9e1e7;
              box-shadow: none;
            }

            input{

              border: 1px solid #6f8195;
              border-right: none;
              // border-radius: 4px 0px 0px 4px;
              color: #6f8195;
              background-color: white;
              outline: none;
              font-size: 12px;
              padding: 8px 16px;

              &:focus{
                border-right: none;
  
                ::placeholder{
                  color: #6f8195;
                }
              }
            
              ::placeholder{
                color: #cccccc;
              }

            }

            #databaselist{
              padding: 0;
              margin: 0;
              border: none;
              outline: none;
              background-color: transparent;
              width: 96px;
              color: #6f8195;

              ::placeholder{
                color: #6f8195;
              }
            }

            button{
              transition: 0s;
              position: relative;
              border: 1px solid #12b3ab;
              border-radius: 0px 4px 4px 0px;
              color: white;
              background-color: #12b3ab;
              padding: 8px;
              outline: none;
              box-shadow: inset 0px -2px 0px darken(#12b3ab, 20%), 0px -1px 0px #12b3ab;
              z-index: 9999999999999;

              span {
                transition: 0s;
                font-size: 12px;
                font-weight: 500;
                position: relative;
                top: -1px;
              }

              &:focus{
                outline: none;
              }

              &:hover{
                box-shadow: inset 0px -1px 0px darken(#12b3ab, 20%);
              }

              &:hover > span{
                top: 0px;
              }

              &:disabled{
                transition: all .3s;
                border: 1px solid #6f8195;
                color: #6f8195;
                background-color: #d9e1e7;
                box-shadow: none;
              }

              &:disabled > span{
                transition: all .3s;
                top: 0px;
              }

            }
          }

          #newprojectbtn{
            border: none !important;
            border-radius: 0 !important;
            // background-color: #9b5de5 !important;
            // box-shadow: inset 0px -2px 0px darken(#9b5de5, 20%), 0px -1px 0px #9b5de5 !important;

            &:hover{
              // box-shadow: inset 0px -1px 0px darken(#9b5de5, 20%) !important;
            }
          }

          #diagramsearch{
            display: flex;
            height: 32px;
          }

          #loading{
            position: fixed;
            font-size: 16px;  
            font-weight: 700;
            color: #2d3748;
            text-align: left;
            margin: 0;
            top: 50;
            left: 50;
            // margin-left: 32px;
          }

        `}</style>
          
      </div>
  );
}

export default Diagrams;

export async function getServerSideProps({ query }) {

  const props = {};
  
  if (query.error)
    props.error = query.error;

  if (query.message)
    props.message = query.message;

  return {props};
}
