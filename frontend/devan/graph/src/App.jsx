import React, { useEffect, useRef } from 'react';
import './app.css'
import * as d3 from 'd3';

function App() {
  const svgRef = useRef();

  useEffect(() => {
    const width = 600;
    const height = 400;

    const data = {
      nodes: [{ id: '1' }, { id: '2' }, { id: '3' }],
      links: [
        { source: '1', target: '2' },
        { source: '2', target: '3' },
      ],
    };

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Create a simulation for forces (gravity, links, etc.)
    const simulation = d3
      .forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links).id((d) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .on('tick', ticked);

    // Add lines for links
    const link = svg
      .append('g')
      .selectAll('line')
      .data(data.links)
      .enter()
      .append('line')
      .attr('stroke', 'gray')
      .attr('stroke-width', 2);

    // Add circles for nodes
    const node = svg
      .append('g')
      .selectAll('circle')
      .data(data.nodes)
      .enter()
      .append('circle')
      .attr('r', 10)
      .attr('fill', '#69b3a2');

    // Add labels
    const labels = svg
    .attr('fill', '#111')
      .append('g')
      .selectAll('text')
      .data(data.nodes)
      .enter()
      .append('text')
      .text((d) => d.id)
      .attr('text-anchor', 'middle')
      .attr('dy', -15)
      .attr('font-size', 20);

    function ticked() {
      // Update the positions of the links and nodes
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);

      labels.attr('x', (d) => d.x).attr('y', (d) => d.y);
    }
  }, []);

  return (
    <div>
      <h1>D3 Graph Visualization</h1>
      <svg ref={svgRef}></svg>
      <button
      
      ></button>
    </div>
  );
}

export default App;
