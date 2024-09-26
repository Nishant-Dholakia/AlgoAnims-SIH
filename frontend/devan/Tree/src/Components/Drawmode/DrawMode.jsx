import React from 'react'

const DrawMode = (props) => {
  return (
    <>
      <div>
        <label htmlFor="pos">Position</label>
        <select
          className="rounded-md"
          onChange={(evt) => {
            props.setPosition(evt.target.value);
          }}

          value={props.position}
          name="position"
          id="pos"
        >
          {props.rootExit === false ? (
            <option>root</option>
          ) : (
            <>
              <option>left</option>
              <option>right</option>
            </>
          )}
        </select>
      </div>

      <div>
        <label htmlFor="no">Value</label>
        <input
          className="w-1/2"
          value={props.value}
          onChange={(evt) => {
            props.setValue(parseInt(evt.target.value));
          }}
          type="number"
          name="no"
          id="no"
        />
      </div>

      {props.rootExit === true ? (
        <div>
          <label htmlFor="whichnode">Node</label>
          <input
            className="w-1/2"
            value={props.nodeno} // Handle NaN: if nodeno is NaN, set it to an empty string
            onChange={(evt) => {
              props.setNodeno(Number(evt.target.value)); // Ensure nodeno is a number, default to 0
            }}
            type="number"
            name="nodeno"
            id="whichnode"
          />
        </div>
      ) : (
        <></>
      )}

      <button
       disabled = {props.disabled}
        onClick={() => {
          if (!props.rootExit) {
            props.setRootExit(true);
            const newArray = [...props.treeArray];
            newArray[0] = props.value;
            props.setTreeArray(newArray);
            props.setFirst(true);
          }
          props.setBtnState((prev) => !prev);
        }}
        className="bg-blue-600 p-2 text-white hover:bg-blue-500 relative right-6"
      >
        Insert
      </button>
    </>
  )
}

export default DrawMode