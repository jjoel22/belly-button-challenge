url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


// d3.json(url).then( data => {
//     console.log(data);
// })

function dropdownmenu(){

    d3.json(url).then( data => {
        console.log(data);
        let names = data.names

        let dropdown = d3.select("#selDataset")

        names.forEach((sample) => {
            dropdown
                .append("option")
                .text(sample)
                .property("value", sample);
        });
        charts(names[0])
        Table(names[0])

    }) 

}

function Table(sample_id){

    d3.json(url).then( data => {
        console.log(data);
        let metaData = data.metadata
        let metaArrays = metaData.filter(number => number.id == sample_id)[0];

        let dropdown = d3.select("#sample-metadata")

    dropdown.html("")

        Object.entries(metaArrays).forEach(entry => {
            const [key, value] = entry;
            console.log(key, value);
            dropdown
            .append("h5")
            .text(`otu ${key}: ${value}`)

          });
    }) 

}

function optionChanged(sample_id){
    charts(sample_id)
    Table(sample_id)
}

dropdownmenu()

function charts(sample_id){

    d3.json(url).then( data => {
        console.log(data);
        let samples = data.samples

        let samplesArrays = samples.filter(number => number.id == sample_id)[0];

        let sample_values = samplesArrays.sample_values

        let otu_ids = samplesArrays.otu_ids

        let otu_labels  = samplesArrays.otu_labels

        var bubbleData = [{
            x:otu_ids,
            y:sample_values,
            text:otu_labels,
            mode: 'markers',
            marker: {
              color:otu_ids,
              colorscale:"Earth",
              size: sample_values
            }
          }];
          
          
          var bubblelayout = {
            title: 'Bubblechart',
            showlegend: false,
          };
          
          Plotly.newPlot('bubble', bubbleData, bubblelayout);
          
          var barData =[{
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).map(x =>`otu ${x}`).reverse(),
            text:otu_labels.slice(0,10).reverse(),
            orientation: 'h',
    
            type: 'bar'
          }];
          
          
          
          var barlayout = {
            title: 'Bar Chart',
        
          };
          
          Plotly.newPlot('bar', barData, barlayout);
          
    }) 

}