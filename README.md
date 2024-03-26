# Telegram уведомления в obsidian
Создавайте напоминалки в Saved Messages (Избранное) в телеграмм.

**Все это пре-альфа-версия, поэтому плагин придется установить руками. Его нет в каталоге плагинов obsidian**.

# Установка
1. Скачайте последнюю версию со страницы релиза.
2. Скопируйте файлы style.css,main.js и manifest.json в папку <vault>/.obsidian/plugins/telecalesync/
3. Перезапустите Obsidian и активируйте плагин в настройках раздела Community plugins

# Использование
1. Зайдите в настройки плагина и, при необходимости, замените формат даты для создания напоминания. См. [документацию moment.js](https://momentjs.com/docs/#/parsing/string/).
2. Зайдите на https://my.telegram.org/ и получите api_id и api_hash, скопируйте их в соответствующие поля.
3. Нажмите кнопку "Login telegram" и следуйте инструкциям. Если вы используете двухфакторную авторизацию, введите пароль в верхнее поле. Если нет -- оставьте поле пустым. Введенный пароль не сохраняется. **О том, что вы залогинены, вы узнаете только в клиенте телеграмм. Пока в интерфейсе про это ничего нет**.
4. Все готово, чтобы создать напоминалку.
5. В любом файле создайте [кодовый блок](https://help.obsidian.md/Editing+and+formatting/Basic+formatting+syntax#Code%20blocks) с языком `reminder` и два поля: datetime и text (**в примере вместо апострофа строит одинарная ковычка, чтобы парсер кода сработал правильно**):

```
'''reminder   
datetime: <дата в вашем формате>
text: Текст напоминалки
'''
```
6. Нажмите Ctrl+P и введите в поиск TeleCaleSync. Выберите подходящую команду: создать напоминалку из открытого файла или просканировать все MD файлы в вашем хранилище и создать напоминалки из них. 
7. Вы великолепны!

# TODO и известные проблемы
- Не всегда обновляется QR код в окне логина
- Иногда плагин долбится на сервера телеграмма, но сам клиент отключен
- Нет кнопок для удобного запуска парсинга
- Нет модальный окон для отображения процесса парсинга
- Нет кода, который надежно будет ставить в локальном хранилище идентификатор сессии ТГ
- Нет отображения статуса логина в ТГ
- Если в заметке больше одного блока напоминаний, парсится верхний.
- Нет удобной команды, которая добавляет блок напоминания в заметку.
