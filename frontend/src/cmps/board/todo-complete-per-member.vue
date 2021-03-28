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
        responsive: true,
        scales: {
          xAxes: [
            {
              display: true,
              gridLines: {
                display: false,
                // color:'#fff'
              },
              scaleLabel: {
                display: true,
                labelString: "Labels",
              },
            },
          ],
          yAxes: [
            {
              display: true,
              gridLines: {
                display: false,
              },
              scaleLabel: {
                display: true,
                labelString: "Tasks Count",
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
        labels: this.labels1,

        datasets: [
          {
            label: "john",
            backgroundColor: "transparent",
            borderColor: this.colors[0],
            data: this.data1,
            fontColor: "#2C4068",
          },

          {
            label: "dean",
            backgroundColor: "transparent",
            borderColor: this.colors[1],
            data: this.data2,
            fontColor: "#2C4068",
          },
        ],
      },
      this.options
    );
  },
};
</script>
