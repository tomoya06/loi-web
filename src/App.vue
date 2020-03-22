<template>
  <v-app>
    <v-app-bar app color="black" dark fixed>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>雷州话字典</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height align-start" fluid>
        <transition name="slide">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </v-container>
    </v-content>
  </v-app>
</template>
