<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    labels1: Array,
    data1: Array,
    labels2: Array,
    data2: Array,
    colors: Array,
  },
  data() {
    return {
      options: {
        legend: {
          position:'top',
          fullWidth: false,
          labels:{
            boxWidth:30,
            padding:10,
            
          },
        },
       
        responsive: true,
        scales: {
          xAxes: [
            {
              display: true,
              gridLines: {
                display: true,
                color: "rgba(250, 250, 250, 0.0)",
              },
              scaleLabel: {
                display: true,
                labelString: "Labels",
                fontSize:16
              },
            },
          ],
          yAxes: [
            {
              display: true,
              gridLines: {
                display: true,
                color: "rgba(250, 250, 250, 0.3)",
              },
              scaleLabel: {
                display: true,
                labelString: "Todos Count",
                fontSize:16

              },
            },
          ],
        },
      },
    };
  },
  mounted() {
    this.renderChart(
      {
        labels: ['Jan','Fab','Mar','Apr','May','Jun'],

        datasets: [
          {
            label: "Noy",
            backgroundColor: "transparent",
            borderColor: 'rgba(255, 99, 132, 1)',
            data: [8, 4, 6, 14, 2, 4],
            fontColor: "#2C4068",
          },

          {
            label: "Ifat",
            backgroundColor: "transparent",
            borderColor: 'rgba(54, 162, 235, 1)',
            data: [5,1, 2, 4, 7, 16],
            fontColor: "#2C4068",
          },
          {
            label: "Anton",
            backgroundColor: "transparent",
            borderColor: 'rgba(255, 206, 86, 1)',
            data: [3, 5, 2, 7, 2, 1],
            fontColor: "#2C4068",
          },
          {
            label: "Noam",
            backgroundColor: "transparent",
            borderColor: 'rgba(75, 192, 192, 1)',
            data: [11, 3, 4, 1, 3, 5],
            fontColor: "#2C4068",
          },

        ],
      },
      this.options
    );
  },
};
</script>
