function bruto_u_neto(bruto, stopa_prireza, stopa_olaksice) {
  
  function round(value) {
    value = parseFloat(value.toFixed(3));
    value = value * 1000;
    var last = value % 10;
    if (last == 5) {
      value = value + 1;
    }
    value = value / 1000;
    return Number(Math.round(value+'e'+2)+'e-'+2);
  }
  
  var mio1 = round(bruto * 0.15);
  var mio2 = round(bruto * 0.05);
  var dohodak = round(bruto - mio1 - mio2);
  var odbitak = 2200 * stopa_olaksice;
  var oporezivo = dohodak - odbitak;
  var porez = 0;
  if (odbitak > dohodak) {
    odbitak = dohodak;
  }
  
  function por12(num) {
    var result = num * 0.12;
    return result;
  }
  function por25(num) {
    var result = num * 0.25;
    return result;
  }
    function por40(num) {
    var result = num * 0.40;
    return result;
  }
  
  if (oporezivo > 0 && oporezivo <= odbitak) {
    porez = round(por12(oporezivo));
  } else if (oporezivo > 2200 && oporezivo <= 8800) {
    porez = round(por12(2200)) + round(por25(oporezivo - 2200));
  } else if (oporezivo > 8800) {
    porez = round(por12(2200)) + round(por25(6600)) + round(por40(oporezivo - 8800));
  }
  
  var prirez = round(porez * stopa_prireza);
  var porez_i_prirez = round(porez + prirez);
  var neto = round(dohodak - porez_i_prirez);
  return neto;
}

function neto_u_bruto(zeljeni_neto, stopa_prireza, stopa_olaksice) {
  var bruto = 1;
  var neto = bruto_u_neto(bruto, stopa_prireza, stopa_olaksice);
  if (neto == zeljeni_neto) {
    return bruto;
  } else {
    while (neto < zeljeni_neto) {
      bruto +=1;
      neto = bruto_u_neto(bruto, stopa_prireza, stopa_olaksice).toFixed(2);
  }
  }
  
  if (neto == zeljeni_neto) {
    return bruto;
  } else {
    while (neto > zeljeni_neto) {
      bruto -=0.01;
      neto = bruto_u_neto(bruto, stopa_prireza, stopa_olaksice).toFixed(2);
  }
  }
  
  var result = bruto;
  return result;
}
