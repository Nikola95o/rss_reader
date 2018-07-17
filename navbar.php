<?php $rss = simplexml_load_file("rss.xml"); ?>

<nav class="navbar navbar-inverse">
    <div class="container-fluid">
            <a class="navbar-brand" href="index.php">Vesti</a>

            <ul class="nav navbar-nav">
                <li class="dropdown">
                    <a id="category" class="dropdown-toggle" data-toggle="dropdown" href="#">Kategorija
                        <span class="caret"></span></a>
                    <ul class="dropdown-menu" id="sel">
                        <?php foreach ($rss as $item): ?>
                            <li><a href="javascript:void(0)" name="<?= $item['id']; ?>"><?= $item->title; ?></a></li>
                        <?php endforeach; ?>
                    </ul>
                </li>
            </ul>
    </div>
</nav>
