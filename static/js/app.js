// Get the URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the JSON data and console log it
d3.json(url).then(response => console.log(response))

// Initialize dashboard 
function init() {

    // Select the dropdown menu using D3
    let dropdownMenu = d3.select("#selDataset")
    
    d3.json(url).then((data) => {
                
        let names = data.names;

        names.forEach((id) => {

            console.log(id);

            dropdownMenu.append("option")
            .text(id)
            .property("value",id)
        });
        
        let sample_data = names[0]
        
        console.log(sample_data)
       
        Metadata(sample_data)
        BarChart(sample_data)
        BubbleChart(sample_data)
        GaugeChart(sample_data)

    })
}


function Metadata(sample) {
    
    d3.json(url).then((data) => {

        let metadata = data.metadata
        let value = metadata.filter(result => result.id == sample)

        console.log(value)

        let valueData = value[0]

        d3.select("#sample-metadata").html("")

        Object.entries(valueData).forEach(([key,value]) => {

            console.log(key,value)

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`)
        })
    })
}


function BarChart(sample) {

    d3.json(url).then((data) => {

        let sampleData = data.samples
        let value = sampleData.filter(result => result.id == sample)
        let valueData = value[0]
        let otu_ids = valueData.otu_ids
        let otu_labels = valueData.otu_labels
        let sample_values = valueData.sample_values

        console.log(otu_ids,otu_labels,sample_values)

        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse()
        let xticks = sample_values.slice(0,10).reverse()
        let labels = otu_labels.slice(0,10).reverse()
        
        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        }

        let layout = {
            title: "Top 10 OTUs"
        }

        Plotly.newPlot("bar", [trace], layout)
    })
}


function BubbleChart(sample) {

    d3.json(url).then((data) => {
        
        let sampleData = data.samples;
        let value = sampleData.filter(result => result.id == sample)
        let valueData = value[0]
        let otu_ids = valueData.otu_ids
        let otu_labels = valueData.otu_labels
        let sample_values = valueData.sample_values

        console.log(otu_ids,otu_labels,sample_values)
        
        let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        }

        let layout = {
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        }
        
        Plotly.newPlot("bubble", [trace1], layout)
    })
}


function scrollOptions(value) { 

    console.log(value)

    Metadata(value)
    BarChart(value)
    BubbleChart(value)
    GaugeChart(value)
}

init()