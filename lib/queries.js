import { gql } from "@apollo/client";

const queries = {
  GET_ALL_DIAGRAMS: gql`query {
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
}