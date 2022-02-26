<template>
  <div>
    <highcharts
      v-if="!loading"
      :constructorType="'stockChart'"
      class="hc"
      :options="chartOptions"
      ref="chart"
    ></highcharts>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Chart-Component",
  data() {
    return {
      chartOptions: {
        rangeSelector: {
          selected: 1,
        },

        title: {
          text: "AAPL Historical",
        },

        yAxis: [
          {
            labels: {
              align: "right",
              x: -3,
            },
            title: {
              text: "OHLC",
            },
            height: "60%",
            lineWidth: 2,
            resize: {
              enabled: true,
            },
          },
          {
            labels: {
              align: "right",
              x: -3,
            },
            title: {
              text: "Volume",
            },
            top: "65%",
            height: "35%",
            offset: 0,
            lineWidth: 2,
          },
        ],

        tooltip: {
          split: true,
        },

        series: [],
      },
      loading: false,
      data: undefined,
      stockData: [],
      volume: [],
    };
  },
  async mounted() {
    this.loading = true;
    await this.getData();
    this.chartOptions.title.text = this.data?.["Meta Data"]?.["1. Information"];
    const name = this.data?.["Meta Data"]?.["2. Symbol"];
    for (const item in this.data?.["Time Series (5min)"]) {
      const timeInepoch = new Date(item).getTime();
      try {
        const open = parseFloat(
          this.data?.["Time Series (5min)"]?.[item]?.["1. open"]
        );
        const high = parseFloat(
          this.data?.["Time Series (5min)"]?.[item]?.["2. high"]
        );
        const low = parseFloat(
          this.data?.["Time Series (5min)"]?.[item]?.["3. low"]
        );
        const close = parseFloat(
          this.data?.["Time Series (5min)"]?.[item]?.["4. close"]
        );
        const volume = parseFloat(
          this.data?.["Time Series (5min)"]?.[item]?.["5. volume"]
        );
        this.stockData.push([timeInepoch, open, high, low, close]);
        this.volume.push([timeInepoch, volume]);
      } catch (error) {
        console.error(error);
        break;
      }
    }
    this.stockData = this.stockData.reverse();
    this.volume = this.volume.reverse();
    this.chartOptions.series = [
      {
        type: "candlestick",
        name: name,
        data: this.stockData,
      },
      {
        type: "column",
        name: "Volume",
        data: this.volume,
        yAxis: 1,
      },
    ];
    this.loading = false;
  },
  methods: {
    async getData() {
      var url =
        "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=HSYVKVTXPLJOUJHU";
      await axios
        .get(url)
        .then((data) => {
          this.data = data.data;
        })
        .catch((error) => {
          console.error("lol", error);
        });
    },
  },
};
</script>
