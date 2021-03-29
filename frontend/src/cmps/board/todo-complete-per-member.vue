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
            label: "Gabi",
            backgroundColor: "transparent",
            borderColor: this.colors[0],
            data: this.data1,
            fontColor: "#2C4068",
          },

          {
            label: "Efi",
            backgroundColor: "transparent",
            borderColor: this.colors[1],
            data: this.data2,
            fontColor: "#2C4068",
          },
          {
            label: "Dov",
            backgroundColor: "transparent",
            borderColor: this.colors[2],
            data: [3,5,2,7,2,1],
            fontColor: "#2C4068",
          },
          {
            label: "Noam",
            backgroundColor: "transparent",
            borderColor: this.colors[3],
            data: [8,3,4,1,3,5],
            fontColor: "#2C4068",
          },
        ],
      },
      this.options
    );
  },
};
</script>
