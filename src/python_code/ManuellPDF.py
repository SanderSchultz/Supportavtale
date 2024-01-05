import sys
import os
from reportlab.pdfgen import canvas
import argparse

def resource_path(relative_path):
    """ Get absolute path to resource, works for dev and for PyInstaller """
    try:
        # PyInstaller creates a temp folder and stores path in _MEIPASS
        base_path = sys._MEIPASS
    except Exception:
        base_path = os.path.abspath(".")

    return os.path.join(base_path, relative_path)

# LAGER EN PDF MED INFORMASJON

parser = argparse.ArgumentParser()

parser.add_argument('--JottaMail')
parser.add_argument('--JottaPassword')
parser.add_argument('--McAfeeMail')
parser.add_argument('--McAfeePassword')
parser.add_argument('--OfficeMail')
parser.add_argument('--OfficePassword')

args = parser.parse_args()

fileName = 'Konto Info Fra Elkjøp.pdf'
mailName = 'Mail: '
mailPass = 'Passord: '

# Case for user having Desktop store in OneDrive folder
if not os.path.exists(os.path.join(os.path.expanduser("~"), "Desktop")):
 
    if os.path.exists(os.path.join(os.path.expanduser("~"), "OneDrive\\Desktop")):
        outfilePath = os.path.join(os.path.expanduser("~"), "OneDrive\\Desktop", fileName)
    elif os.path.exists(os.path.join(os.path.expanduser("~"), "OneDrive\\Skrivebord")):
        outfilePath = os.path.join(os.path.expanduser("~"), "OneDrive\\Skrivebord", fileName)
    else:
        print("Cant find path")
else:
    outfilePath = os.path.join(os.path.expanduser("~"), "Desktop/", fileName)

DocumentTitle = 'Konto Info fra Elkjøp'
title = 'Kontoinformasjon Elkjøp Supportavtale'

pdf = canvas.Canvas(outfilePath)
pdf.setTitle(DocumentTitle)

        
pdf.setFillColorRGB(0,0,1)
pdf.setFont("Helvetica-Bold", 25)
pdf.drawString(60, 680, title)

pdf.setFillColorRGB(0,0,0)

pdf.line(30, 650, 550, 650)
pdf.line(30, 565, 550, 565)
if args.McAfeeMail == None and args.JottaMail == None:
    pass
else:
    pdf.line(30, 420, 550, 420)

if not args.OfficeMail == None:
    pdf.line(30, 275, 550, 275)

pdf.setFont("Times-Roman", 15)

if not args.JottaMail == None:
    pdf.drawString(30, 500, mailName)
    pdf.drawString(30, 470, mailPass)
    pdf.drawString(100, 500, args.JottaMail)
    pdfImageJotta = resource_path('Jottalogo2.png')
    if not args.JottaPassword == None:
        pdf.drawString(100, 470, args.JottaPassword)


if not args.McAfeeMail == None:
    pdfImageMcafee = resource_path('Mcafeelogo2.png')

if not args.OfficeMail == None:
    pdfImageMicrosoft = resource_path('Office111.png')

pdfImageSupport = resource_path("support.png")

pdfImageEL = resource_path("logo2.png")

pdf.drawInlineImage(pdfImageEL, 100, 720)

if not args.JottaMail == None:
    pdf.drawInlineImage(pdfImageJotta, 300, 455)
if not args.McAfeeMail == None:
    pdf.drawInlineImage(pdfImageMcafee, 300, 310)
if not args.OfficeMail == None:
    pdf.drawInlineImage(pdfImageMicrosoft, 300, 165)

pdf.drawInlineImage(pdfImageSupport, -270, -85)

if not args.McAfeeMail == None:
    pdf.drawString(30, 360, mailName)
    pdf.drawString(30, 330, mailPass)
    pdf.drawString(100, 360, args.McAfeeMail)
    
    if not args.McAfeePassword == None:
        pdf.drawString(100, 330, args.McAfeePassword)

if not args.OfficeMail == None:
    pdf.drawString(30, 220, mailName)
    pdf.drawString(30, 190, mailPass)
    pdf.drawString(100, 220, args.OfficeMail)
    
    if not args.OfficePassword == None:
        pdf.drawString(100, 190, args.OfficePassword)

pdf.setFont("Times-Roman", 12)

infoForKunde = 'Kjære kunde!'
pdf.drawString(265, 631, infoForKunde)

infoForKunde2 = 'Takk for at du har benyttet deg av våre teknikere til å få satt opp ditt produkt. Her har du en oversikt over'
pdf.drawString(47, 618, infoForKunde2)

infoForKunde3 = 'brukernavn og passord knyttet til dine kontoer. Ta med denne informasjonen ved service på ditt produkt.'
pdf.drawString(47, 605, infoForKunde3)

pdf.setFont("Times-Roman", 20)

infoForKunde4 = 'Ta godt vare på denne informasjonen!'
pdf.drawString(143, 580, infoForKunde4)

pdf.setFont("Times-Roman", 10)

if not args.McAfeeMail == None:
    infoForKunde5 = 'For administrasjon og endring av passord, gå til: '
    pdf.drawString(30, 300, infoForKunde5)


if not args.JottaMail == None:
    infoForKunde7 = 'For administrasjon og endring av passord, gå til: '
    pdf.drawString(30, 440, infoForKunde7)

if not args.OfficeMail == None:
    infoForKunde9 = 'For administrasjon og endring av passord, gå til: '
    pdf.drawString(30, 160, infoForKunde9)

if not args.McAfeeMail == None:
    pdf.setFillColorRGB(0,0,1) 
    pdf.setFont("Times-Roman", 13)
    infoForKunde5 = 'https://www.mcafee.com'
    pdf.drawString(227, 300, infoForKunde5)

if not args.JottaMail == None:
    pdf.setFillColorRGB(0,0,1) 
    pdf.setFont("Times-Roman", 13)
    infoForKunde6 = 'https://www.sikkerlagring.elkjop.no'
    pdf.drawString(227, 440, infoForKunde6)

if not args.OfficeMail == None:
    pdf.setFillColorRGB(0,0,1)
    pdf.setFont("Times-Roman", 13)
    infoForKunde8 = 'https://www.outlook.com'
    pdf.drawString(227, 160, infoForKunde8)

pdf.save()
