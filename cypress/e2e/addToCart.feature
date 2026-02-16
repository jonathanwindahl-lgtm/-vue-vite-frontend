Feature: Lägg till i kundvagn

Scenario: Ta mig till produktsidan

  Given Jag är på hemsidan
  When Jag klickar på en produkt
  Then Tar mig till produktsidan

  When Jag väljer en storlek
  When Jag klickar på lägg i varukorg knappen
  Then Produkten läggs till i varukorgen och varukorgen uppdateras
