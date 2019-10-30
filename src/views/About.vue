<template>
  <main-container>
    <v-col>
      <main-card
        titleColor="orange" title="About this Project"
        @callDrawer="$emit('callDrawer')"
      >
        <v-container fluid>
          <v-row>
            <v-col cols="12" offset-sm="1" sm="10" md="6">
              <p>
                <!-- eslint-disable -->
                Wrestling fans have been debating this question on the internet ever since the first two wrestling fans met online. With the power of simple divisions and trendline calculation, this project will attempt to answer that question once and for all, at least for WWE’s PPV era, before the advent of its network subscription that change everything. But let’s face the truth, the biggest draws in wrestling history are the stars of the Attitude Era, so the best best of PPV era is the best there is, the best there was, and the best there ever will be.</p>
            </v-col>
            <v-col cols="12" offset-sm="1" sm="10" md="6">
              <p>
                A little background on the origin and legitimacy of underlying data.. Most of the PPV buys were scrapped from <a href="http://www.2xzone.com/wwe/buyrates.shtml#.XbiaE-hKguU" target="new">2xzon.com</a>. Their stats are  either from WWE’s public filings or approximations using published buyrates. Some earlier, less prominent events’s buys were sourced from the internet/dirty sheets. While by no means the perfect datasets, the major events’ numbers are verified against multiple sources and the lesser events show no irregularities. If you spot any errors, please email me and I will update the data.</p>
            </v-col>
            <v-col cols="12" offset-sm="1" offset-md="0" sm="10" md="4">
              <v-container>
                <v-row>
                  <v-col cols="6" md="12">
                    <v-card outlined target="new"
                     href="http://www.2xzone.com/wwe/buyrates.shtml#.Xbnt5-hKguV">
                      <v-card-title>Pay-Per-View buyrates</v-card-title>
                      <v-card-subtitle>2xzone.com</v-card-subtitle>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
            <v-col cols="12" offset-sm="1" sm="10" md="6">
              <p>
                With PPV buys in hand, we can easily calculate year-over-year growth, shown as net percentage change in this project. Events are benchmarked against their closest direct counterpart in the previous years(SummerSlam ‘08 to ‘07, Vengeance ‘07 to ‘06 etc.) when the data is available, otherwise against closest event which are within +- 2 weeks exactly a year prior. If there is no directly comparable event and there are four or more events within six months of the same date one year prior, comparison is made against the average of the middle three events(always excluding the highest buys).</p>
              <p>
                While YoY growth are good indicators for the business’ health, often times overall trend in WWE’s popularity can inflate/deflate those numbers. Limited by data availability, time, and resources, only simple linear trendline adjustment is attempted in this project. Slopes and offsets are calculated using six previous events and the expected seven value times coefficient determination  is subtracted from the actual growth to adjust for trend.</p>
            </v-col>
            <v-col cols="12" offset-sm="1" offset-md="0" sm="10" md="4">
              <v-container>
                <v-row>
                  <v-col cols="6" md="12">
                    <v-card outlined target="new"
                     href="https://en.wikipedia.org/wiki/Linear_trend_estimation">
                      <v-card-title>Linear Trend Estimation</v-card-title>
                      <v-card-subtitle>Wikipedia</v-card-subtitle>
                    </v-card>
                  </v-col>
                  <v-col cols="6" md="12">
                    <v-card outlined target="new"
                     href="https://en.wikipedia.org/wiki/Coefficient_of_determination">
                      <v-card-title>Coefficient of Determination</v-card-title>
                      <v-card-subtitle>Wikipedia</v-card-subtitle>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
            <v-col cols="12" offset-sm="1" sm="10" md="6">
              <p>
                Another muddy subject is trying to determine the order of the cards in each event. Unlike combat sports, championships doesn’t dictate the significance of the match. Compounding the fact that events like Survivor Series or Royal Rumble have supposed main events that involve up to 30 wrestlers, discretion is required for picking out the real headliners.</p>
              <p>
                I tried my best in sticking to a single set of guidelines in making judgements, and it is as follows:</p>
              <p>
                <ol>
                  <li>The length of the match per wrestlers. Those that get the most time are usually the most important.</li>
                  <li>World/WWE heavyweight championships in most events are the main stipulations for their headline cards.</li>
                  <li>(Additional)Stakes, from the classic “retirement” to the attitude era special “control of the company”, they added importance to the card.</li>
                  <li>Face on the poster.</li>
                </ol>
              </p>
            </v-col>
            <v-col cols="12" offset-sm="1" offset-md="0" sm="10" md="4">
              <v-container>
                <v-row>
                  <v-col cols="6" md="12">
                    <v-card outlined target="new"
                     href="http://www.profightdb.com/cards/wwe-cards-pg1-yes-2.html?order=date&ppv=yes&type=asc">
                      <v-card-title>WWE Pay Per View Cards</v-card-title>
                      <v-card-subtitle>The Internet Wrestling Database</v-card-subtitle>
                    </v-card>
                  </v-col>
                  <v-col cols="6" md="12">
                    <v-card outlined target="new"
                     href="http://www.profightdb.com/cards/wwf-cards-pg1-yes-1.html?order=date&type=asc">
                      <v-card-title>WWF Pay Per View Cards</v-card-title>
                      <v-card-subtitle>The Internet Wrestling Database</v-card-subtitle>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
            <v-col cols="12" offset-sm="1" sm="10" md="6">
              <p>
                All these data points and methodology probably seemed overwhelming, so here’s the short answer: biggest draw, ever, in the PPV era, according to the data is…</p>
              <p>Vince McMahon!</p>
              <p>
                Even though he only headlined four events but the growth on them are monstrous!</p>
              <p>
                <i>JK, TL-DR it’s Mick Foley, Mankind put butts in seats.</i>
              </p>
            </v-col>
          </v-row>
        </v-container>
        <!-- eslint-enable -->
      </main-card>
    </v-col>
  </main-container>
</template>

<script>
import MainContainer from './components/MainContainer.vue';
import MainCard from './components/MainCard.vue';

export default {
  name: 'About',
  components: {
    'main-container': MainContainer,
    'main-card': MainCard,
  },
};
</script>

<style lang="scss" scoped>
</style>
