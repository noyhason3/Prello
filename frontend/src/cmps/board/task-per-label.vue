<script>
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  props: {
    labels: Array,
    data: Array,
    colors: Array,
  },
  data() {
    return {
      options: {
        legend: {
          display:true,
  
        },
        scales: {
          xAxes: [
            {
              display: false,
              gridLines: {
                display: true,
                color: "rgba(250, 250, 250, 0.0)",
              },
              scaleLabel: {
                display: true,
                labelString: "Labels",
                fontSize:14
              },
            },
          ],
          yAxes: [
            {
              display: false,
              gridLines: {
                display: true,
                color: "rgba(250, 250, 250, 0.5)",
              },
              scaleLabel: {
                display: true,
                labelString: "Tasks Count",
                fontSize:14
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
        labels: this.labels,

        datasets: [
          {
            label: "",
            backgroundColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            data: this.data,
            fontColor: "#2C4068",
          },
        ],
      },
      this.options
    );
  },
};
</script>
