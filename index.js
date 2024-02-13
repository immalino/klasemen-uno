const url =
  "https://docs.google.com/spreadsheets/d/1t8wuqMYwW3IlwpcfmOk8r-p6Trgt7oYyNomozvI6Uxg/gviz/tq?";

const output1 = document.querySelector(".output1");
const output2 = document.querySelector(".output2");

fetch(url)
  .then((res) => res.text())
  .then((rep) => {
    const data = JSON.parse(rep.substr(47).slice(0, -2));
    console.log(data);

    data.table.cols.unshift({
      id: "A",
      label: "#",
      type: "number",
      pattern: "General",
    });
    data.table.cols.splice(2, 0, {
      id: "A",
      label: "Main",
      type: "number",
      pattern: "General",
    });

    data.table.cols.push({
      id: "F",
      label: "Poin",
      type: "number",
      pattern: "General",
    });

    data.table.rows.forEach((row) => {
      const nilai1 = row.c[1].v;
      const nilai2 = row.c[2].v;
      const nilai3 = row.c[3].v;

      const totalPertama = nilai1 + nilai2 + nilai3;

      const totalTerakhir = row.c[1].v * 2 + row.c[2].v + row.c[3].v * -1;

      row.c.splice(1, 0, { v: totalPertama });

      row.c.push({ v: totalTerakhir });
    });

    const row = document.createElement("tr");
    output1.append(row);
    data.table.cols.forEach((heading) => {
      const cell = document.createElement("th");
      cell.textContent = heading.label;
      row.append(cell);
    });

    const rows = data.table.rows;
    rows.sort(function (a, b) {
      var lastVValueA = a.c[a.c.length - 1].v;
      var lastVValueB = b.c[b.c.length - 1].v;
      return lastVValueB - lastVValueA;
    });

    let counter = 1;
    data.table.rows.forEach((row) => {
      row.c.unshift({ v: counter.toString() });
      counter++;
    });

    data.table.rows.forEach((main) => {
      const container = document.createElement("tr");
      output2.append(container);
      main.c.forEach((ele) => {
        const cell = document.createElement("td");
        cell.textContent = ele.v;
        container.append(cell);
      });
    });
  });

// Fungsi untuk menampilkan/menyembunyikan pop up check
function toggleCheckPopup() {
  var popupCheckContainer = document.getElementById("popupCheckContainer");
  if (
    popupCheckContainer.style.display === "none" ||
    popupCheckContainer.style.display === ""
  ) {
    popupCheckContainer.style.display = "block";
    // Fokuskan input nama saat pop up ditampilkan
    document.getElementById("namaInput").focus();
  } else {
    popupCheckContainer.style.display = "none";
  }
}

function checkPopup() {
  // Mengambil nilai input kode
  var kode = document.getElementsByName("Kode")[0].value;

  // Memeriksa apakah kode yang dimasukkan sesuai
  if (kode === "112233") {
    // Jika sesuai, lakukan aksi yang diinginkan, misalnya menampilkan popup berikutnya
    toggleCheckPopup();
    togglePopup();
  } else if (kode === "223344"){

    window.location.href = "https://immalino.github.io/klasemen-uno/control/"

  }
  else {
    // Jika tidak sesuai, beri pesan peringatan
    alert("Kode yang dimasukkan tidak valid. Silakan coba lagi.");
    toggleCheckPopup();
  }
}


// Fungsi untuk menampilkan/menyembunyikan pop up form
function togglePopup() {
  var popupContainer = document.getElementById("popupContainer");
  if (
    popupContainer.style.display === "none" ||
    popupContainer.style.display === ""
  ) {
    popupContainer.style.display = "block";
    // Fokuskan input nama saat pop up ditampilkan
    document.getElementById("namaInput").focus();
  } else {
    popupContainer.style.display = "none";
  }
}

// Fungsi untuk menangani submit form

function SubForm() {
  $.ajax({
    url: "https://api.apispreadsheets.com/data/jBsKUmd17UZFpWO4/",
    type: "post",
    data: $("#myForm").serializeArray(),
    success: function () {
      alert("Form Data Submitted :)");
    },
    error: function () {
      alert("There was an error :(");
    },
  });
  togglePopup();
}
