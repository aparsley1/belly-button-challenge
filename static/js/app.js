// URL
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// Build the metadata panel
function buildMetadata(sample) {
  d3.json(url).then((data) => {

    // get the metadata field
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let value = metadata.filter(result => result.id == sample);
    
    console.log(value)

    let valueData = value[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    // Use `.html("") to clear any existing metadata
    d3.select("#sample-metadata").html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(valueData).forEach(([key,value]) => {
      console.log(key,value);
      d3.select("#sample-metadata").append("h5").text(`${key.toUpperCase()}: ${value}`);
    })
  });
};

// function to build both charts
function buildCharts(sample) {
  d3.json(url).then((data) => {

    // Get the samples field
    let sampleInfo = data.samples;

    // Filter the samples for the object with the desired sample number
    let value = sampleInfo.filter(result => result.id == sample);

    let valueData = value[0];

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = valueData.otu_ids;
    let otu_labels = valueData.otu_labels;
    let sample_values = valueData.sample_values;

    console.log(otu_ids,otu_labels,sample_values);

    // Build a Bubble Chart
    let trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids
      }
    };

    var layout = {
        title: "Bacteria Cultures Per Sample",
        xaxis: {title: "OTU ID"},
        yaxis: {title: "Number of Bacteria"}

    };

    // Render the Bubble Chart
    Plotly.newPlot("bubble", [trace1], layout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let xticks = sample_values.slice(0,10).reverse();
    let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
    let labels = otu_labels.slice(0,10).reverse();

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let trace2 = {
      x: xticks,
      y: yticks,
      text: labels,
      type: "bar",
      orientation: "h"
    };

    var layout = {
        title: "Top 10 Bacteria Cultures Found",
        xaxis: {title: "Number of Bacteria"}
    };

    // Render the Bar Chart
    Plotly.newPlot("bar", [trace2], layout)
  });
}

// Function to run on page load
function init() {
  d3.json(url).then((data) => {

    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdownMenu = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    names.forEach((id) => {
      console.log(id);

      dropdownMenu.append("option")
      .text(id)
      .property("value",id);
    });

    // Get the first sample from the list
    let sample1 = names[0];
    console.log(sample1);

    // Build charts and metadata panel with the first sample

  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected

}

// Initialize the dashboard
init();
