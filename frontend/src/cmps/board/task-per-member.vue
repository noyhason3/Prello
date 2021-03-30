<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  props: {
    labels: Array,
    data: Array,
    colors: Array,
  },
  data() {
    return {
      options: {
        legend: {
          display: false,
        },
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
                labelString: "Members",
                fontSize:16
              },
               ticks: {
                    // autoSkip: true,
                    padding:10
                }
            },
          ],
          yAxes: [
            {
              display: true,
              gridLines: {
                display: true,
                color: "rgba(250, 250, 250, 0.5)",
              },
              scaleLabel: {
                display: true,
                labelString: "Tasks Count",
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
        labels: this.labels,

        datasets: [
          {
            label: "",
            // backgroundColor: 'transparent',
            backgroundColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "#B7D75A",
              "rgba(255, 170, 75, 1)",
            ],
            data: this.data,
            fontColor: "#2C4068",
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            
          },
        ],
      },
      this.options
    );
  },
};
</script>



// import { Pie } from "vue-chartjs";

// export default {
//   extends: Pie,
//   props: {
//     labels: Array,
//     data: Array,
//     colors: Array,
//     // options:Object
//   },
 
//   mounted() {
//     this.renderChart(
//       {
//         labels: this.labels,

//         datasets: [
//           {
//             label: "",
//             backgroundColor: this.colors,
//             // color: "#ffffff",
//             data: this.data,
//             borderColor: 'transparent',
//             // borderColor: [
//             //   "rgba(255, 99, 132, 1)",
//             //   "rgba(54, 162, 235, 1)",
//             //   "rgba(255, 206, 86, 1)",
//             //   "rgba(75, 192, 192, 1)",
//             //   "rgba(153, 102, 255, 1)",
//             //   "rgba(255, 159, 64, 1)",
//             // ],
//           },
//         ],
//       },
//       this.options
//     );
//   },
// };
// </script>
