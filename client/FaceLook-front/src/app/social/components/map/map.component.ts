import { Component, OnInit, Inject, AfterViewInit, Input } from "@angular/core";
import { GoogleMapsModule } from "@angular/google-maps";
import  MarkerClusterer from "@google/markerclusterer"; 

import { LocationService } from "../../service/locationService.service";
import { postApiService } from "../../service/postApi.service";
import { markerCollectionsService } from "../../service/marker-collection.service";
import { ToastInjector } from "ngx-toastr";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements AfterViewInit {
  userCurrentLocation: any;

  constructor(
    public locationService: LocationService,
    public mapsModule: GoogleMapsModule,
    private postApiService: postApiService
  ) {}

  @Input() markers:any;

  ngAfterViewInit() {
    this.getUserCurrentLocation();
  }

  async getUserCurrentLocation() {
    this.userCurrentLocation = await this.locationService.getLocation();
    this.markers.subscribe(
      markers=>{
        this.myMap(markers);
      }
    )

  }

  myMap(markers) {
    console.log("map comp marker ==>");
    console.log(markers);
    
    
    let myCenter = {
      lat: this.userCurrentLocation.lat,
      lng: this.userCurrentLocation.lng
    };
    // gen center prop of the map
    let mapProp: google.maps.MapOptions = {
      center: new google.maps.LatLng(
        this.userCurrentLocation.lat,
        this.userCurrentLocation.lng
      ),
      zoom: 13,
      streetViewControl: false
    };
    //init the map and props
    let googleMap = new google.maps.Map(
      document.getElementById("googleMap"),
      mapProp
    );

    //user PIN marker on current location on the map
    let marker = new google.maps.Marker({
      position: myCenter,
      animation: google.maps.Animation.DROP,
      title: "YOU!",
      zIndex: 100
    });
    //add the marker of user curr location
    marker.setMap(googleMap);

    let wiredMarkers = {};

    //////// second on the map: all posts
    markers.forEach(elm => {
      console.log("MAP elm");
      console.log(elm);
      
      //create post location coordinates
      let postLocation = { lat: +elm.lat, lng: +elm.lng };

      //create post props
      let postMarker = new google.maps.Marker({
        position: postLocation,
        animation: google.maps.Animation.DROP,
        icon: {

          url: "http://localhost:3000/public/uploads/images/" + elm.image,
          scaledSize: new google.maps.Size(50, 50, "px", "px")
        },
        title: elm.title
      });
      //add props to map
      postMarker.setMap(googleMap);

      let bubbleDiv = `
        <div class="info_content">
          <p>
            Title: <b>${elm.title}</b>
            <br />
            Publisher: <b>${elm.publisherName}</b>
          </p>
          <p><a (onclick)="openPost('${elm.postId}')">READ ME</a></p>
        </div>`;

      //add bubbles to the map
      let infowindow = new google.maps.InfoWindow({
        content: bubbleDiv,
        maxWidth: 200
      });

      // OPEN infoWindow
      postMarker.addListener("mouseover", () => {
        infowindow.open(googleMap, postMarker);
      });
    });
  }


  openPost(postId){
    console.log("POST ID: ");
    console.log(postId);

  }
}
